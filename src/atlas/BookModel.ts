import * as T from 'three';
export function textTexture(text:string,subtitle='',cover=false){const c=document.createElement('canvas');c.width=1024;c.height=cover?1400:128;const ctx=c.getContext('2d')!;
 if(cover){ctx.fillStyle='#142b39';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<18000;i++){ctx.fillStyle=`rgba(220,225,210,${Math.random()*.05})`;ctx.fillRect(Math.random()*1024,Math.random()*1400,1,2)}ctx.strokeStyle='#b69b65';ctx.lineWidth=3;ctx.strokeRect(65,65,894,1270);ctx.strokeRect(82,82,860,1236);
  for(const [x,y] of [[135,135],[889,135],[135,1265],[889,1265]]){ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-44,y);ctx.lineTo(x+44,y);ctx.moveTo(x,y-44);ctx.lineTo(x,y+44);ctx.stroke()}
  ctx.beginPath();for(let i=0;i<8;i++){const angle=i*Math.PI/4;const x=512+Math.cos(angle)*125,y=850+Math.sin(angle)*125;ctx.moveTo(512,850);ctx.lineTo(x,y)}ctx.stroke();ctx.textAlign='center';ctx.fillStyle='#dec492';ctx.font='76px Georgia';ctx.fillText(text,512,590);ctx.font='26px Georgia';ctx.fillText(subtitle,512,665);ctx.beginPath();ctx.arc(512,850,94,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(418,850);ctx.lineTo(606,850);ctx.moveTo(512,756);ctx.lineTo(512,944);ctx.stroke();ctx.font='20px serif';ctx.fillText('Z O N G L I N   F E N G',512,1160)}
 else{ctx.textAlign='center';ctx.font='42px Georgia';ctx.fillStyle='#eee7d5';ctx.shadowColor='#08120f';ctx.shadowBlur=8;ctx.fillText(text,512,75)}const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;return tex;}
export function createBook(){
 const root=new T.Group(),left=new T.Group(),right=new T.Group();root.add(left,right);
 const grainCanvas=document.createElement('canvas');grainCanvas.width=256;grainCanvas.height=256;const grain=grainCanvas.getContext('2d')!;grain.fillStyle='#808080';grain.fillRect(0,0,256,256);for(let i=0;i<18000;i++){const v=90+Math.floor(Math.random()*75);grain.fillStyle=`rgb(${v},${v},${v})`;grain.fillRect(Math.random()*256,Math.random()*256,2,2)}const leatherGrain=new T.CanvasTexture(grainCanvas);leatherGrain.wrapS=leatherGrain.wrapT=T.RepeatWrapping;leatherGrain.repeat.set(3,4);
 const leather=new T.MeshStandardMaterial({color:'#1c3545',roughness:.52,metalness:.22,bumpMap:leatherGrain,bumpScale:.045});
 const paper=new T.MeshStandardMaterial({color:'#e1d6b8',roughness:.92,side:T.DoubleSide});
 const gold=new T.MeshStandardMaterial({color:'#c8ab70',metalness:.85,roughness:.28});
 const box=(w:number,h:number,d:number,mat:T.Material,x:number,y:number,z:number,parent:T.Group)=>{const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh};
 box(.22,.40,3.65,leather,0,0,0,root);
 // Raised binding bands, fine gold tooling, and a silk bookmark.
 for(const z of [-1.45,-.85,.85,1.45])box(.25,.045,.085,gold,0,.20,z,root);
 const ribbon=new T.Mesh(new T.PlaneGeometry(.10,1.05,1,12),new T.MeshStandardMaterial({color:'#617f72',side:T.DoubleSide,roughness:.65}));ribbon.rotation.x=-Math.PI/2;ribbon.position.set(.09,.18,1.65);root.add(ribbon);
 for(const [side,sign] of [[left,-1],[right,1]] as const){
  box(2.65,.20,3.65,leather,sign*1.325,-.13,0,side);
  box(2.48,.22,3.42,paper,sign*1.3,.035,0,side);
  for(let i=0;i<10;i++)box(2.48,.004,3.42,new T.MeshStandardMaterial({color:i%2?'#b9ac8c':'#e6dbc1'}),sign*1.3,-.06+i*.02,0,side);
  for(const z of [-1.67,1.67]){
   box(.36,.045,.075,gold,sign*2.48,-.05,z,side);box(.075,.045,.36,gold,sign*2.59,-.05,z-sign*.0,side);
  }
  box(.028,.032,3.44,gold,sign*2.60,-.052,0,side);
  for(const z of [-1.73,1.73])box(2.52,.032,.028,gold,sign*1.32,-.052,z,side);
  const c=document.createElement('canvas');c.width=512;c.height=700;const ctx=c.getContext('2d')!;ctx.fillStyle='#e1d6b8';ctx.fillRect(0,0,512,700);ctx.strokeStyle='#b69b65';ctx.lineWidth=5;ctx.strokeRect(35,35,442,630);ctx.lineWidth=.8;ctx.strokeRect(44,44,424,612);
  for(const [x,y] of [[56,56],[456,56],[56,644],[456,644]]){ctx.beginPath();ctx.moveTo(x-9,y);ctx.lineTo(x,y-9);ctx.lineTo(x+9,y);ctx.lineTo(x,y+9);ctx.closePath();ctx.stroke();}
  ctx.strokeStyle='#8a765188';ctx.lineWidth=2;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(98,478+i*10);ctx.lineTo(414,478+i*10);ctx.stroke();}
  ctx.strokeStyle='#9b7945';ctx.lineWidth=3;ctx.beginPath();ctx.arc(256,204,60,0,Math.PI*2);ctx.moveTo(210,204);ctx.lineTo(302,204);ctx.moveTo(256,158);ctx.lineTo(256,250);ctx.stroke();ctx.textAlign='center';ctx.fillStyle='#766344';ctx.font='24px Georgia';ctx.fillText('THE ATLAS',256,100);ctx.font='bold 26px Georgia';ctx.fillText(sign<0?'Origins of Knowledge':'A Constellation of Ideas',256,305);ctx.font='16px Georgia';ctx.fillText('Z O N G L I N   F E N G',256,365);ctx.beginPath();ctx.moveTo(155,420);ctx.lineTo(357,420);ctx.stroke();
  // A visible constellation engraving beneath the page title.
  ctx.strokeStyle='#8b704a';ctx.lineWidth=2;const stars=[[125,545],[195,575],[256,535],[325,580],[390,540]];ctx.beginPath();stars.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();for(const [x,y] of stars){ctx.fillStyle='#8b704a';ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill()}
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
  const geom=new T.PlaneGeometry(2.48,3.42,32,1);geom.rotateX(-Math.PI/2);const pos=geom.attributes.position;for(let i=0;i<pos.count;i++)pos.setY(i,Math.sin((pos.getX(i)+1.24)/2.48*Math.PI)*.06);geom.computeVertexNormals();
  const page=new T.Mesh(geom,new T.MeshStandardMaterial({map:tex,side:T.DoubleSide,roughness:.9}));page.position.set(sign*1.3,.16,0);side.add(page);
 }
 const cover=new T.Mesh(new T.PlaneGeometry(2.65,3.65),new T.MeshStandardMaterial({map:textTexture('THE ATLAS','A Universe of Knowledge',true),roughness:.48,metalness:.3,emissive:'#233747',emissiveIntensity:.25,side:T.DoubleSide}));cover.rotation.x=Math.PI/2;cover.position.set(-1.325,-.201,0);left.add(cover);
 root.rotation.x=0;root.position.set(0,-3.8,0);return {root,left,right};
}
