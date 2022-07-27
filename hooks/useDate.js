export function formatDate(dte){
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let theDay = new Date(dte);
    return theDay.toLocaleDateString('en-US', options) 
  }

//   export const APIURL = "ttps://certify.baremind.co.za/api"
// export const BASEURL = 'ttps://certify.baremind.co.za'
export const BASEURL = "https://certify.baremind.co.za/"
export const APIURL = "https://certify.baremind.co.za/api/"