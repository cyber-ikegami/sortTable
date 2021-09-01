// 入力必須チェック　(後で実装)
function inputRequiredCheck() {
	const excelData = document.getElementById("excelData");
	const load = document.getElementById("load");
	let flag = 0;

    if(excelData.value == ""){
        flag = 1;
    }

    if(flag){
        load.disabled = true;
    } else {
        load.disabled = false;
    }
}

function getHeaderData(){
	const excelData = document.getElementById('excelData').value;
    const recordList = excelData.split(/\n/g);
    let HeaderList = [];

    for(let i = 0; i < recordList.length; i++){
    HeaderList[i] = recordList[0].split(/[,\t]/g);
    }
    // let menuValue = ""; 
    
    // メモ：連想配列を作りたい
    // for(let i = 0; i < HeaderList.length; i++){
    //     HeaderList[i] = recordList[0].split(/[,\t]/g);
    //     menuValue = menuValue + '\'' + HeaderList[i] + '\'' + ':' + '\'' + i + '\''
    // メモ：i + 1をどうにかする
    //     if(i + 1 > HeaderList.length){
    //         menuValue = menuValue + ',';
    //     } else {
    //         break;
    //     }
    // }

    // 確認用
    alert(HeaderList)

    // 参考サイトコピー（メモ）
    // let menu = {menuValue};
    // let id = document.getElementById('sortOrder');

    // // メニュー項目のセット
    // for (let i in menu) 
    // {
    //     let element = document.createElement('option');
    //     element.setAttribute('value', i);
    //     element.innerHTML = menu[i];
    //     id.appendChild( element );
    // }
}