import {Color, MathUtils, Vector2} from "https://cdn.skypack.dev/three@0.149.0";
import Delaunator from "https://cdn.skypack.dev/delaunator@5.0.0";

console.clear();

let c1 = new Color(0x4488ff);
let c2 = new Color(0x880000);
let c = new Color();

let ptsBase = [];
let ptsActual = [];
let step = 100;

function refill(){
  
  cnv.width = 300;
  cnv.height = innerHeight;
  
  ptsBase = [];
  ptsActual = [];
  
  for(let y = -step; y < cnv.height + step * 2; y += step){
    for(let x = -step; x < cnv.width + step * 2; x += step){
      let v = new Vector2(x, y + step * 0.5);
      v.move = {
        r: Math.random() * 20 + 40,
        phase: Math.random() * Math.PI * 2,
        speedRatioX: (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
        speedRatioY: (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
        pRmin: 5,
        pRdif: 5
      }
      ptsBase.push(v);
    }
  }

  ptsActual = new Array(ptsBase.length).fill().map(p => {return [0, 0]});
  
}

refill();
window.addEventListener("resize", event => {
  refill();
})

let ctx = cnv.getContext("2d");

let timeStart = performance.now();

draw();

function draw(){
  let t = (performance.now() - timeStart) * 0.001;
  
  t *= 0.25;
  
  ptsActual.forEach((p, idx) => {
    let pbase = ptsBase[idx];
    p[0] = pbase.x + Math.cos(pbase.move.phase + t * pbase.move.speedRatioX) * pbase.move.r;
    let yShift = (cnv.height + step * 2) + ((pbase.y - (t * 100) - (cnv.height + step * 1.5)) % (cnv.height  + step * 3));
    //console.log(yShift);
    p[1] = yShift + Math.sin(pbase.move.phase + t * pbase.move.speedRatioY) * pbase.move.r;
  })
  //console.log(ptsActual)
  
  let tris = Delaunator.from(ptsActual).triangles;
  let trisCount = tris.length / 3;
  //console.log()
  
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.save();
  ctx.strokeStyle = "#f40";
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  for(let i = 0; i < trisCount; i++){
    
    let p0 = ptsActual[tris[i * 3 + 0]];
    let p1 = ptsActual[tris[i * 3 + 1]];
    let p2 = ptsActual[tris[i * 3 + 2]];
    
    let avg = MathUtils.clamp(((p0[1] + p1[1] + p2[1]) / 3) / cnv.height, 0., 1.);
    avg = Math.floor(avg * 20) / 20;
    c.lerpColors(c1, c2, avg);
    ctx.fillStyle = "#" + c.getHexString();
    //ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
  }
  
  ctx.fillStyle = "#fa8";
  ctx.strokeStyle = "#00a";
  ctx.lineWidth = 2;
  ptsActual.forEach((p, idx) => {
    
    let pbm = ptsBase[idx].move;
    
    let sinVal = Math.sin(pbm.phase + t * 4) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(p[0], p[1], sinVal * pbm.pRdif + pbm.pRmin, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
  })
  ctx.restore();
  requestAnimationFrame(draw);
}