const PAGE = {
  data:{
    total:20,
    pageSize:3,
    currentPage:1,
  },
  init:function(){
    this.render();
    this.bind();
  },
  bind:function(){
    $('.number-list').on('click','.number-item',this.filterNumber);
    $('.page-nav').on('click','.up-page',this.upPage);
    $('.page-nav').on('click','.next-page',this.nextPage);
  },
  render:function(){
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let currentPage = PAGE.data.currentPage;
    let totalPage = Math.ceil(total/pageSize);
    let tmpArr = []
    for(let i = 0;i<total; i++){
      let str = i+1;
      tmpArr.push(str);
    }
    let pageArr = [];
    for(let i = 0;i<totalPage; i++){
      let totastr = i+1;
      pageArr.push(totastr);
    }
    let showData = tmpArr.filter((item,index)=>{
      return index >=(currentPage-1)*pageSize && index <currentPage*pageSize;
    });
    let serialMap =pageArr.map((data)=>{
      return`<div class="number-item" data-id="${data}">${data}</div>`
    }).join('');
    let showArrMap = showData.map((data) =>{
      return`
      <div class="pagination-item">
        <div class="pagination-item-name">janke ${data}</div>
        <div class="pagination-item-content">务要求：
        1. 定义并自动生成一定数量的数据，可以自由调整，例如 98 条。
        2. 定义每页展示的数据量，可以自由调整，例如 10 条。
        3. 根据定义的数据量和每页展示数据量计算并展示出多少页，例如 98/10 向上取整10 页
        4. 给分页绑定点击事情，点击修改当前页面计算出展示哪些数据。</div>
      </div>
      <hr>
      `
    }).join('');
    $('.pagination-list').html(showArrMap);
    $('.number-list').html(serialMap);
  },
  filterNumber:function(e){
    let filterItem = e.target;
    let filter = filterItem.dataset.id;
    PAGE.data.currentPage = Number(filter);
    PAGE.render();
  },
  upPage:function(){
    let currentPage = PAGE.data.currentPage;
    PAGE.data.currentPage = currentPage-1;
    if(currentPage<=1){
      PAGE.data.currentPage = 1
      return;
    }
    PAGE.render();
  },
  nextPage:function(){
    let total = PAGE.data.total;
    let pageSize = PAGE.data.pageSize;
    let totalPage = Math.ceil(total/pageSize);
    let currentPage = PAGE.data.currentPage;
    PAGE.data.currentPage = currentPage+1;
    if(currentPage>=totalPage){
      PAGE.data.currentPage = currentPage;
      return;
    }
    PAGE.render();
  }
}
PAGE.init();