class Tools{
constructor(page){    
    this.page =page;
}
async hasText(element){
await expect(element).toBeVisible();
}
}
module.exports = {Tools}; 
