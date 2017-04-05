import React from 'react';
import { G,Path, Polygon,Rect,Circle} from 'react-native-svg';

// Each nameValuePair can be:
// * Name: <Svg />; or
// * Name: { svg: <Svg />, viewBox: '0 0 50 50' }

export default {
    SortArrows:<Path d="M24 91.537l5.99-6.12-15.87-15.495L8 75.912V83h9v8h7.162H24v.537zm34.464-61.329c0-.954-.521-1.432-1.563-1.432-.434 0-.781.174-1.042.52L20.052 64.975c-.26.347-.39.738-.39 1.172 0 .955.477 1.432 1.432 1.432.434 0 .781-.13 1.041-.39L57.943 31.38c.347-.347.52-.738.52-1.172zm-3.646-12.63l27.474 27.474L27.344 100H0V72.526l54.818-54.948zM100 23.958c0 2.257-.825 4.21-2.474 5.86L86.588 40.755 59.115 13.281 70.052 2.474C71.615.824 73.568 0 75.912 0c2.343 0 4.383.825 6.12 2.474l15.494 15.364c1.65 1.737 2.474 3.777 2.474 6.12z"/>,
    Facebook:{
	    svg:<Path d="M296.296,512H200.36V256h-64v-88.225l64-0.029l-0.104-51.976C200.256,43.794,219.773,0,304.556,0h70.588v88.242h-44.115 c-33.016,0-34.604,12.328-34.604,35.342l-0.131,44.162h79.346l-9.354,88.225L296.36,256L296.296,512z"/>,
	    height: '512',
	    width: '512',
	    viewBox: '0 0 512 512'
	},
	Google:{
		svg: <G><Path d="M273.372,302.498c-5.041-6.762-10.608-13.045-16.7-18.842c-6.091-5.804-12.183-11.088-18.271-15.845 c-6.092-4.757-11.659-9.329-16.702-13.709c-5.042-4.374-9.135-8.945-12.275-13.702c-3.14-4.757-4.711-9.61-4.711-14.558	c0-6.855,2.19-13.278,6.567-19.274c4.377-5.996,9.707-11.799,15.986-17.417c6.28-5.617,12.559-11.753,18.844-18.415			c6.276-6.665,11.604-15.465,15.985-26.412c4.373-10.944,6.563-23.458,6.563-37.542c0-16.75-3.713-32.835-11.136-48.25			c-7.423-15.418-17.89-27.412-31.405-35.976h38.54L303.2,0H178.441c-17.699,0-35.498,1.906-53.384,5.72			c-26.453,5.9-48.723,19.368-66.806,40.397C40.171,67.15,31.129,90.99,31.129,117.637c0,28.171,10.138,51.583,30.406,70.233			c20.269,18.649,44.585,27.978,72.945,27.978c5.71,0,12.371-0.478,19.985-1.427c-0.381,1.521-1.043,3.567-1.997,6.136			s-1.715,4.62-2.286,6.14c-0.57,1.521-1.047,3.375-1.425,5.566c-0.382,2.19-0.571,4.428-0.571,6.71			c0,12.563,6.086,26.744,18.271,42.541c-14.465,0.387-28.737,1.67-42.825,3.86c-14.084,2.19-28.833,5.616-44.252,10.28			c-15.417,4.661-29.217,11.42-41.396,20.27c-12.182,8.854-21.317,19.366-27.408,31.549C3.533,361.559,0.01,374.405,0.01,386.017			c0,12.751,2.857,24.314,8.565,34.69c5.708,10.369,13.035,18.842,21.982,25.406c8.945,6.57,19.273,12.083,30.978,16.562			c11.704,4.47,23.315,7.659,34.829,9.562c11.516,1.903,22.888,2.854,34.119,2.854c51.007,0,90.981-12.464,119.909-37.397			c26.648-23.223,39.971-50.062,39.971-80.517c0-10.855-1.57-20.984-4.712-30.409C282.51,317.337,278.42,309.254,273.372,302.498z			 M163.311,198.722c-9.707,0-18.937-2.475-27.694-7.426c-8.757-4.95-16.18-11.374-22.27-19.273			c-6.088-7.898-11.418-16.796-15.987-26.695c-4.567-9.896-7.944-19.792-10.135-29.692c-2.19-9.895-3.284-19.318-3.284-28.265			c0-18.271,4.854-33.974,14.562-47.108c9.705-13.134,23.411-19.701,41.112-19.701c12.563,0,23.935,3.899,34.118,11.704			c10.183,7.804,18.177,17.701,23.984,29.692c5.802,11.991,10.277,24.407,13.417,37.257c3.14,12.847,4.711,24.983,4.711,36.403			c0,19.036-4.139,34.317-12.419,45.833C195.144,192.964,181.775,198.722,163.311,198.722z M242.251,413.123			c-5.23,8.949-12.319,15.94-21.267,20.981c-8.946,5.048-18.509,8.758-28.693,11.14c-10.183,2.385-20.889,3.572-32.12,3.572			c-12.182,0-24.27-1.431-36.258-4.284c-11.99-2.851-23.459-7.187-34.403-12.991c-10.944-5.8-19.795-13.798-26.551-23.982			c-6.757-10.184-10.135-21.744-10.135-34.69c0-11.419,2.568-21.601,7.708-30.55c5.142-8.945,11.709-16.084,19.702-21.408			c7.994-5.332,17.319-9.713,27.979-13.131c10.66-3.433,20.937-5.808,30.833-7.139c9.895-1.335,19.985-1.995,30.262-1.995			c6.283,0,11.043,0.191,14.277,0.567c1.143,0.767,4.043,2.759,8.708,5.996s7.804,5.428,9.423,6.57			c1.615,1.137,4.567,3.326,8.85,6.563c4.281,3.237,7.327,5.661,9.135,7.279c1.803,1.618,4.421,4.045,7.849,7.279			c3.424,3.237,5.948,6.043,7.566,8.422c1.615,2.378,3.616,5.28,5.996,8.702c2.38,3.433,4.043,6.715,4.998,9.855			c0.948,3.142,1.854,6.567,2.707,10.277c0.855,3.72,1.283,7.569,1.283,11.57C250.105,393.713,247.487,404.182,242.251,413.123z"/><Polygon points="401.998,73.089 401.998,0 365.449,0 365.449,73.089 292.358,73.089 292.358,109.636 365.449,109.636 	365.449,182.725 401.998,182.725 401.998,109.636 475.081,109.636 475.081,73.089 "/></G>,
	    viewBox: '0 0 475.092 475.092'
	},
	Photo:{
		svg:<G><Path d="M54.63,10H3.37C1.512,10,0,11.512,0,13.37v35.26C0,50.488,1.512,52,3.37,52h51.26c1.858,0,3.37-1.512,3.37-3.37V13.37
		C58,11.512,56.488,10,54.63,10z M56,48.63c0,0.756-0.614,1.37-1.37,1.37H3.37C2.614,50,2,49.386,2,48.63V13.37
		C2,12.614,2.614,12,3.37,12h51.26c0.756,0,1.37,0.614,1.37,1.37V48.63z"/><Path d="M30,14c-9.374,0-17,7.626-17,17s7.626,17,17,17s17-7.626,17-17S39.374,14,30,14z M30,46c-8.271,0-15-6.729-15-15
		s6.729-15,15-15s15,6.729,15,15S38.271,46,30,46z"/><Path d="M20,8h19c0.553,0,1-0.447,1-1s-0.447-1-1-1H20c-0.553,0-1,0.447-1,1S19.447,8,20,8z"/>
		</G>,
		 height: '512',
	     width: '512',
	     viewBox: '0 0 75 75'
	},
	Video:{
		svg:<G><G><Path d="M23.125,34.797H2.872C1.288,34.797,0,33.509,0,31.927V16.719c0-1.583,1.288-2.87,2.872-2.87h20.253
			c1.583,0,2.87,1.288,2.87,2.87v15.208C25.995,33.509,24.708,34.797,23.125,34.797z M2.872,14.849C1.84,14.849,1,15.688,1,16.719
			v15.208c0,1.031,0.84,1.87,1.872,1.87h20.253c1.031,0,1.87-0.839,1.87-1.87V16.719c0-1.031-0.839-1.87-1.87-1.87H2.872z"/>
			<Path d="M36.874,33.086c-0.104,0-0.207-0.032-0.294-0.096l-11.379-8.266c-0.13-0.094-0.206-0.244-0.206-0.404
			s0.077-0.311,0.206-0.405l11.376-8.261c0.151-0.11,0.354-0.125,0.521-0.041c0.168,0.085,0.273,0.257,0.273,0.445l0.003,16.526
			c0,0.188-0.105,0.36-0.272,0.445C37.029,33.068,36.951,33.086,36.874,33.086z M26.346,24.32l10.028,7.284l-0.003-14.564
			L26.346,24.32z"/>
			</G>
			<Path d="M6.135,14.849C2.752,14.849,0,12.096,0,8.713s2.752-6.136,6.135-6.136s6.136,2.752,6.136,6.136S9.518,14.849,6.135,14.849z
				 M6.135,3.577C3.304,3.577,1,5.881,1,8.713s2.304,5.136,5.135,5.136c2.832,0,5.136-2.304,5.136-5.136S8.967,3.577,6.135,3.577z"/>
			<Path d="M19.859,14.849c-3.383,0-6.136-2.752-6.136-6.136s2.753-6.136,6.136-6.136s6.136,2.752,6.136,6.136
				S23.242,14.849,19.859,14.849z M19.859,3.577c-2.832,0-5.136,2.304-5.136,5.136s2.304,5.136,5.136,5.136s5.136-2.304,5.136-5.136
				S22.691,3.577,19.859,3.577z"/>
		</G>,
		height: '512',
	    width: '512',
	    viewBox: '0 0 50 50'
	},
	Stop:{
		svg:
			  <Rect
                    x="10"
                    y="7"
                    width="45"
                    height="45"
                    stroke="white"
                    strokeWidth="1"
                    fill="white"
                />,
			height: '512',
	     	width: '512',
	     	viewBox: '0 0 75 75'
		
	},
	Cancel:{
		svg:
		<Path y="10" d="M26.561,0h-24c-0.552,0-1,0.447-1,1s0.448,1,1,1h24c9.925,0,18,8.075,18,18s-8.075,18-18,18H4.975l6.293-6.293l-1.414-1.414
	l-7.999,7.999c-0.001,0.001-0.001,0.001-0.002,0.002L1.146,39l0.706,0.706c0.001,0.001,0.001,0.001,0.002,0.002l7.999,7.999
	l1.414-1.414L4.975,40h21.586c11.028,0,20-8.972,20-20S37.588,0,26.561,0z"/>
	},
	Rec:{
		svg:
		<Circle cx="20" cy="20" r="16"/>,
		width:'50',
		height:'50',
		viewBox: '0 0 50 50'
	},
	Cross:{
		svg:
			<G>
			  <Path d="M107.888,96.142l80.916-80.916c3.48-3.48,3.48-8.701,0-12.181s-8.701-3.48-12.181,0L95.707,83.961L14.791,3.045   c-3.48-3.48-8.701-3.48-12.181,0s-3.48,8.701,0,12.181l80.915,80.916L2.61,177.057c-3.48,3.48-3.48,8.701,0,12.181   c1.74,1.74,5.22,1.74,6.96,1.74s5.22,0,5.22-1.74l80.916-80.916l80.916,80.916c1.74,1.74,5.22,1.74,6.96,1.74   c1.74,0,5.22,0,5.22-1.74c3.48-3.48,3.48-8.701,0-12.181L107.888,96.142z"/>
			</G>,
			viewBox:'0 0 191.414 191.414'
	}
}
