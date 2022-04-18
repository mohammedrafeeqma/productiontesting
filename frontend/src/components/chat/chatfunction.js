var datas
function sample(data){
    alert(data)
    alert('hii')
    datas = data
    test(data)
    }

function test(){
    return datas
}
export {sample,test}