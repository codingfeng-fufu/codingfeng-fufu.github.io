import triples from './triples.json';
export type AtlasNode={id:string;label:string;kind:string;note:string;depth:number;x:number;y:number;z:number;fx:number;fy:number;fz:number;facts:{predicate:string;object:string;source:string}[]};
export type AtlasLink={source:string|AtlasNode;target:string|AtlasNode;relation:string;sourceUrl?:string};
export const palette:Record<string,string>={core:'#e0c38d',kg:'#a7c7b2',rag:'#9fc4d3',agents:'#c4badb',projects:'#99bdc0',papers:'#d0b09d',tech:'#e4dec9'};
export function knowledgeData(){
 const projects=new Set(triples.filter(t=>t.predicate==='showcases project').map(t=>t.object));
 const papers=new Set(triples.filter(t=>t.predicate==='has full title').map(t=>t.subject));
 const names=[...new Set(triples.flatMap(t=>[t.subject,t.object]))];
 const id=(name:string)=>'entity-'+names.indexOf(name);
 const classify=(name:string)=>name==='Zonglin Feng'?'core':projects.has(name)?'projects':papers.has(name)?'papers':/graph|entity|relation|triple|provenance/i.test(name)?'kg':/retrieval|QA|search|query/i.test(name)?'rag':/agent|memory|planning|repair|learning/i.test(name)?'agents':'tech';
 const kinds=['kg','rag','agents','projects','papers','tech'];
 const nodes:AtlasNode[]=[];
 const constellation=(i:number)=>{
  // Pisces: western circlet, eastern fish, and two ribbons meeting at Alrescha.
  const t=i/(names.length-1);let x:number,y:number,z:number;
  if(t<.34){const a=t/.34*Math.PI*2;x=-4.2+Math.cos(a)*2.1;y=.65+Math.sin(a)*1.7;z=Math.sin(a*2)*.55;}
  else if(t<.68){const a=(t-.34)/.34*Math.PI*2;x=3.8+Math.cos(a)*1.45;y=1.8+Math.sin(a)*2.4;z=Math.cos(a*2)*.65;}
  else{const u=(t-.68)/.32;const branch=u<.5;const v=branch?u*2:(u-.5)*2;x=branch?-4.2+v*4.2:3.8-v*3.8;y=branch?-.9-v*1.25:-.5-v*1.65;z=Math.sin(v*Math.PI)*.8;}
  return {x,y,z};
 };
 for(const name of names){const kind=classify(name);const index=names.indexOf(name);
 const {x,y,z}=kind==='core'?{x:0,y:-2.15,z:0}:constellation(index);

 const facts=triples.filter(t=>t.subject===name).map(t=>({predicate:t.predicate,object:t.object,source:t.source}));
 const incoming=triples.filter(t=>t.object===name);
 const note=facts.length?facts.map(f=>`${f.predicate}: ${f.object}`).join('\n'):incoming.map(f=>`${f.subject} — ${f.predicate} — ${name}`).join('\n');
 const label=name.startsWith('https://')?name.includes('github.com')?'Repository · '+name.split('/').pop():'Paper PDF':name;
 nodes.push({id:id(name),label,kind,note,depth:kind==='core'?0:projects.has(name)||papers.has(name)?1:2,x,y,z,fx:x,fy:y,fz:z,facts});
 }
 const links:AtlasLink[]=triples.map(t=>({source:id(t.subject),target:id(t.object),relation:t.predicate,sourceUrl:t.source}));
 return {nodes,links};
}
