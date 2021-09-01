// 入力必須チェック
function inputRequiredCheck() {
	const excelData = document.getElementById("excelData");
	const load = document.getElementById("load");

    if(excelData.value == ""){
        load.disabled = true;
    } else {
        load.disabled = false;
    }
}

// 読み込みボタン押下時動作
// ヘッダーの値を取得し、ソート順コンボボックスに出力
function getHeaderData(){
    const sortOrder = document.getElementById('sortOrder');
    sortOrder.disabled = false;
    
    // メモ：コンボボックスのリセットがしたい
    // while(sortOrder.lastChild){
    //     if(!document.getElementById('null')){
    //         sortOrder.removeChild(sortOrder.lastChild);
    //     }
    // }

	const excelData = document.getElementById('excelData').value;
    const recordList = excelData.split(/\n/g);
    let headerList = recordList[0].split(/[,\t]/g);
    
    for(let i = 0; i < headerList.length; i++){
        let option = document.createElement("option");
        option.text = headerList[i];
        option.value = i;
        sortOrder.appendChild(option);
    }
}