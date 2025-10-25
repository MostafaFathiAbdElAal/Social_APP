export function pathIsVaild(path:string){
if(path.includes("undefined") || path.includes("default")){
    return false
}else{
    return true
}
}