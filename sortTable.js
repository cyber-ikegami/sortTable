// 入力必須チェック　(後で実装)
// function inputRequiredCheck() {
// 	const excelData = document.getElementById("excelData");
// 	const load = document.getElementById("load");
// 	let flag = 0;

//     if(excelData.value == ""){
//         flag = 1;
//     }

//     if(flag){
//         load.disabled = true;
//     } else {
//         load.disabled = false;
//     }
// }

function getHeaderData(){
	const excelData = document.getElementById('excelData').value;
    const recordList = excelData.split(/\n/g);
    let HeaderList = [];
    HeaderList[0] = recordList[0].split(/[,\t]/g);
    
    

}