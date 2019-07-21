const PAGE={
    data:{
        cardContent:['耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！','耿昌宇老师，我是7月5日购买课程的学员，还有一个视频就全部学完了。你的课程简单易学非常感谢，恰逢新年来临送上我的祝福！'],
        backgroundUrl:['url(./image/ingenuity-message-bg-red.png)','url(./image/ingenuity-message-bg-blue.png)','url(./image/ingenuity-message-bg-green.png)','url(./image/ingenuity-message-bg-yellow.png)'],
        paddingOffset:10,
        itemWidth: 324,
        itemHeight: 167,
        zIndex: 0,
        item:null ,
        itemOffsetTop: null,
        itemOffsetLeft: null,
        pageX:null,
        pagey:null,
        isLock:true,
    },
    init:function(){
        this.cardContent()
        this.bind()
    },
    bind:function(){
        $('#message-board').on('mousedown','.message-item',this.mouseDown)
        $('#message-board').on('mouseup','.message-item',this.mouseUp)
        $('#message-board').on('click','.message-item-tag-remove',this.reMove)
        // $('.message-item').on('mousedown',this.mouseDown);
        // $('.message-item').on('mouseup',this.mouseUp);
        $(window).on('mousemove',this.mouseMove);
        $('#message-bottom').on('click',this.button);
    },
    cardContent:function(){
        PAGE.data.cardContent.forEach(item =>{
            PAGE.addCard(item)
        })
    },
    addCard:function(item){
        let cardWidth = $('#message-board').width();
        let cardHeight = $('#message-board').height();
        let maxWidth = cardWidth-PAGE.data.paddingOffset-PAGE.data.itemWidth;
        let maxHeight = cardHeight-PAGE.data.paddingOffset-PAGE.data.itemHeight;
        let randomTop = PAGE.random(PAGE.data.paddingOffset,maxHeight);
        let randomLeft = PAGE.random(PAGE.data.paddingOffset,maxWidth);
        let zIndex = PAGE.data.zIndex++
        let backgroundUrl = PAGE.data.backgroundUrl[Math.floor(Math.random()*10)%PAGE.data.backgroundUrl.length]
        let messageItem = `
                <div class="message-item" style="left:${randomLeft}px;top:${randomTop}px;z-index:${zIndex};background:${backgroundUrl}">
                    ${item}
                    <img class="message-item-tag-remove" src="./image/ingenuity-message-remove.png">
                </div> `;
        $('#message-board').append(messageItem);
        
    },
    random:function(min,max){
        return Math.floor(Math.random()*(max-min)+min)
    },
    mouseDown:function(e){
        let item =e.target;
        $(item).css('z-index',`${PAGE.data.zIndex++}`)
        PAGE.data.item = item;
        PAGE.data.itemOffsetTop = item.offsetTop;
        PAGE.data.itemOffsetLeft= item.offsetLeft;
        PAGE.data.pageX= e.pageX;
        PAGE.data.pagey= e.pageY;
        PAGE.data.isLock = false;
    },
    mouseMove:function(e){
        if(!PAGE.data.isLock){
            let cardWidth = $('#message-board').width();
            let cardHeight = $('#message-board').height();
            let maxWidth = cardWidth-PAGE.data.paddingOffset-PAGE.data.itemWidth;
            let maxHeight = cardHeight-PAGE.data.paddingOffset-PAGE.data.itemHeight;
            let translateX = e.pageX-PAGE.data.pageX+PAGE.data.itemOffsetLeft;
            let translateY = e.pageY-PAGE.data.pagey+PAGE.data.itemOffsetTop;
            let paddingOffset = PAGE.data.paddingOffset;
            translateX = translateX > maxWidth ? maxWidth : translateX;
            translateY = translateY > maxHeight? maxHeight : translateY;
            translateX = translateX < paddingOffset ? paddingOffset : translateX;
            translateY = translateY < paddingOffset ? paddingOffset :translateY;
            $(PAGE.data.item).css('left',`${translateX}px`)
            $(PAGE.data.item).css('top',`${translateY}px`)
        }
    },
    mouseUp:function(){
        PAGE.data.isLock=true;
    },
    button:function(){
        let value = $('#message-input-text').val();
        if(value==''){
            return;
        }else{
            PAGE.addCard(value);
            $('#message-input-text').val(null);
        }
    },
    reMove:function(){
        $(this).parent().remove();
    }
}
PAGE.init()