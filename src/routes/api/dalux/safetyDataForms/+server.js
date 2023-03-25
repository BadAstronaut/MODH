import {ProcessSafetyData} from './transformSafetyData.js';

let daluxProjectId= import.meta.env.VITE_PROJECT_ID;
let daluxKey = import.meta.env.VITE_DALUX_KEY;
//https://stackoverflow.com/questions/70472978/sveltekit-proxy-api-to-avoid-cors
//useful but still getting 404 error
/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const response =await fetch(`https://field.dalux.com/service/api/1.1/projects/${daluxProjectId}/forms`, {
        headers: {
            'X-API-KEY': daluxKey
        }
    });
    const data = await response.json();
    const cleanData = ProcessSafetyData(data);
    //console.log(data, 'data from server dalux endpoint')
    //return response.ok;
    return new Response(JSON.stringify(cleanData))
    //return  new Response(JSON.stringify(data))
  }