import React, {Component , createRef} from 'react';
import songFile from '../audio/sample1.mp3';

	let ctx , x2 , y2 , bar_height;

	const width = window.innerWidth;
	const height = window.innerHeight;
	const bars = 555;
	const bar_width = 1;
	const radius = 0 ;

	const x0 = width / 2;
	const y0 = height / 2;

class Canvas extends Component
{
	constructor(props)
	{
		super(props);
		this.audio = new Audio(songFile);
		this.canvas = createRef();
	}

	animationLooper(canvas)
	{
		canvas.width = width;
		canvas.height = height;

		ctx = canvas.getContext('2d');

		for(var i = 0 ; i < bars ; i++)
		{
			const rads = Math.PI * 2 / bars;
			
			bar_height = this.frequency_array[i] * 2;

			const x1  = x0 + Math.cos(rads * i ) * (radius);
			const y1  = y0 + Math.sin(rads * i ) * (radius);

			x2 = x0 + Math.cos(rads * i) * (radius + bar_height);
			y2 = y0 + Math.sin(rads * i) * (radius + bar_height);

			this.drawBar(x1,y1,x2,y2,this.frequency_array[i],ctx,canvas);
		}
	}

	drawBar(x1 = 0 , y1 = 0 , x2 = 0 , y2 = 0 , frequency , ctx , canvas)
	{
		const gradient = ctx.createLinearGradient(0,0,0, canvas.height);
		gradient.addColorStop(0,"rgba(35,7,77,1)");
		gradient.addColorStop(1,"rgba(204,83,51,1");
		ctx.fillStyle = gradient;

		const  lineColor = "rgb(" + frequency + "," + frequency + "," + 205 +")";
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = bar_width;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}

	componentDidMount(){
		this.context = new (window.AudioContext || window.webKitAudioContext);
		this.source = this.context.createMediaElementSource(this.audio);

		this.analyser = this.context.createAnalyser();
		this.source.connect(this.analyser);
		this.analyser.connect(this.context.destination);
		this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
	}


	togglePlay = () =>{
		const {audio} = this;
		if(audio.paused){
			audio.play();
			this.rafId = requestAnimationFrame(this.tick);

		}else{
			audio.pause();
			cancelAnimationFrame(this.rafId);
		}

	}

	tick = () =>{
		this.animationLooper(this.canvas.current);
		this.analyser.getByteTimeDomainData(this.frequency_array);
		this.rafId = requestAnimationFrame(this.tick);
	}


	componentWillUnmount(){
		cancelAnimationFrame(this.rafId);
		this.analyser.disconnect();
		this.source.disconnect();
	}
	render(){
		return(
			<>
			<button onClick = {this.togglePlay}>play/pause</button>
			<canvas ref = {this.canvas}/>
			
			</>
			);
	}
}













export default Canvas;