const setCookie = (name,value,days)=>{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
}