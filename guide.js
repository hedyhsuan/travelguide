

//下拉選單區
let district=document.querySelector(".district");
// 熱門景點BTN
let hotBtn=document.querySelectorAll(".btn-group .hotbtn");
let btnGroup=document.querySelector(".btn-group");
//區域標題
let titleOfarea=document.querySelector(".titleOfarea");
//景點內容
let areaContent=document.querySelector(".areaContent");



// // 讀高雄行政區API的AJAX
// let county=new XMLHttpRequest();
// county.open("get","https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/AllData.json");
// county.send();

// // 在資料都讀取完之後完成下面的動作
// county.onload=function(){
//         let datas=JSON.parse(county.responseText);
//       // 把轉回物件[{},{},{}...]的城市資料存在變數datas裡
//         let Ksiung=datas[17].AreaList;
//         // console.log(Ksiung);
  
//         let str="<option>選擇行政區</option>";
//         for (let i=0;i<Ksiung.length;i++){
//           alldistrics.push(Ksiung[i].AreaName)
//           str+="<option>"+alldistrics[i]+"</option>";
//         }
       
//        // console.log(alldistrics);
//         district.innerHTML=str;       
        
//     }

// 讀取景點資料API的AJAX

// 區域選單
let data=[];
let loc=new XMLHttpRequest();
loc.open("get","https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json");
loc.send();
loc.onload=function(){
  let datas=JSON.parse(loc.responseText);
  // 把從字串轉回物件的資料存進data這個變數裡
  // console.log(datas);
  data=datas.result.records;
  console.log(data); 
  addOption();
  //把各區名塞進選單
  
  titleChangeFun();
  //區域title隨點擊改變

  contentChangeFun();
  //景點內容隨點擊改變

  allContent();
  //所有景點都有的初始畫面


  
}
// 下拉選單

function addOption(){
     let alldistricts=[];
     for(let i=0;i<data.length;i++){
     alldistricts.push(data[i].Zone);
    // console.log(alldistricts);

    }
let eachDistrict =Array.from(new Set(alldistricts));
    // console.log(eachDistrict);
      
let str = "<option> - 請選擇行政區 - </option>";
  
for(let i=0;i<eachDistrict.length;i++){
     str+=`<option class="areaOption" value= "${eachDistrict[i]}"> ${eachDistrict[i]} </option>`
  }; 
    district.innerHTML=str;       
}


//titleOfarea隨下拉選單變更
function titleChangeFun(){
    const areaOption = document.querySelectorAll('.district option[value]');
  // console.log(areaOption);
    //把option裡面的value存在變數裡
   district.addEventListener("change",titleChange)
  
    function titleChange(e){
       let select = e.target.value;
     
       let str="";
       for(let i=0; i<areaOption.length; i++){
         if(select == areaOption[i].value){
         str = areaOption[i].value}
          // console.log(str);
          }
      titleOfarea.textContent = str;
     
          }
        
      }

//titleOfarea隨熱點點擊變更

// for (let i=0;i<hotBtn.length;i++){
//     let select=this.value;
//     let str="";
//    hotBtn[i].addEventListener('click',function(){
//      if(select = hotBtn[i].value){
//        str=select;
//      }
//       titleOfarea.textContent = str;
//    })
    
  // }


   btnGroup.addEventListener('click',toggle);
   function toggle(e){
        // console.log(e.target.value);
  
        if(e.target.nodeName !== "BUTTON"){return};
        let str=e.target.value;
        titleOfarea.textContent = str;
      
        
        
   }
    
//景點內容隨點擊改變

function contentChangeFun(){
    district.addEventListener("change",contentChange);
    
    btnGroup.addEventListener('click',contentChange);
 

    function contentChange(e){
        if(e.target.nodeName == "DIV"){return};    

    let select=e.target.value;

// console.log(e.target.nodeName);
    str="";

    for(let i=0; i<data.length; i++){
        if(select == data[i].Zone){
            str+=`
            <div class="col-12 col-md-6 col-lg-4 mb-5">
            <div class="card-img rounded">
              <div class="p-3 pt-5 text-white d-flex justify-content-between align-items-end bg-img" style="background-image:url(${data[i].Picture1})">
                <h5 class="m-0 mt-5">${data[i].Name}</h5>
                
                <span class="badge badge-pill badge-primary">${data[i].Zone}</span> 
                
              </div>
              
              <div class="inform p-3">
                <p class="m-0 pb-2 "> <i class="fas fa-clock"></i>${data[i].Opentime}</p>
                <p class="m-0 pb-2"> <i class="fas fa-home"></i>${data[i].Add}</p>
                <p class="m-0 "> <i class="fas fa-mobile-alt fa-mobile"></i>${data[i].Tel}</p>
                
                </div>
              </div>
            
            </div>

            `
        }
       }
        areaContent.innerHTML=str;
   
}
}
//所有景點都有的初始畫面
function allContent(){
    let str="";
    for(let i=0; i<data.length; i++){
        str+=`
        <div class="col-12 col-md-6 col-lg-4 mb-5">
        <div class="card-img rounded">
          <div class="p-3 pt-5 text-white d-flex justify-content-between align-items-end bg-img" style="background-image:url(${data[i].Picture1})">
            <h5 class="m-0 mt-5">${data[i].Name}</h5>
            
            <span class="badge badge-pill badge-primary">${data[i].Zone}</span> 
            
          </div>
          
          <div class="inform p-3">
            <p class="m-0 pb-2 "> <i class="fas fa-clock"></i>${data[i].Opentime}</p>
            <p class="m-0 pb-2"> <i class="fas fa-home"></i>${data[i].Add}</p>
            <p class="m-0 "> <i class="fas fa-mobile-alt fa-mobile"></i>${data[i].Tel}</p>
            
            </div>
          </div>
        
        </div>

        `
    }
    areaContent.innerHTML = str;
    
}

Vue.component('paginate', VuejsPaginate);
const PAGE_SIZE=2;

var app=new Vue({
  el:"#app",
  data:{
    listdata:[],
    currentPage:1,
    pageCount:1
  },
  computed:{
    pageListdata:function (){
      var vm=this;
      if(vm.listdata && vm.listdata.length > 0){
        return vm.listdata.filter(function(x){
          return x.page === vm.currentPage;
        })
      }else{
        return [];
      }
    }
  },
  watch:{
    listdata:function (val) {
          this._setPage2Model();
    }
  },
  methods:{
    _setPage2Model:function() {
      var vm = this;

      if(!vm.listdata || vm.listdata.length<=0){
        vm.pageCount = 1;
      }else{
        vm.pageCount = parseInt(vm.listdata.length / PAGE_SIZE) + (vm.listdata.length % PAGE_SIZE > 0 ? 1 : 0);
        for (let i = 0; i < vm.listdata.length; i++) {
          vm.$set(vm.listdata[i], "page", parseInt(i / PAGE_SIZE) + 1);
      }
    }
  },
  pageCallback: function (page){
    var vm=this;
    this.$set(vm,"currentPage",page);
  },
},
  created(){
    var vm=this;
    vm.listdata=data;
  },
})




