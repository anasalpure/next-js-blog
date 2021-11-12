export function getBaseURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_API_URL || 'https://microservice.newsifier.com/api/v2'
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path,isAuth=true) {
  let response;
  let requestUrl;
  const options = {
    headers : {
      'Content-Type': 'application/json',
      'X-Tenant' : 'androidworld.newsifier.com',
      'x-visitor' : 'Windows',
      'visitor' : 'Windows',
      'origin' : 'https://androidworld.newsifier.com'
    }
  };

  if(isAuth){
    options.headers.Authorization = 'Bearer ' + process.env.API_TOKEN;
  }

  try{
    requestUrl = getBaseURL(path);
    response = await fetch(requestUrl, options);
  }catch(ex){
    console.warn('error while connect to api '+path)
    return [];
  }

  if(response.status != 200){
    console.log('[endpoint]',requestUrl);
    console.log('[response]',response.status);
    // console.log('[resObject]',response);
    return[];
  }
    
  const data = await response.json();
  return data;
}

