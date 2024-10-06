document.addEventListener('DOMContentLoaded', function(){
    const chamada1 = document.getElementById("land3");
    const carrinho = document.getElementById("car");
    const btn_fechar = document.getElementById("btn_close");
    const grid = document.getElementById("grid");
    const grid2 = document.getElementById("grid2");
    const itensCart = document.getElementById("itens-cart");
    const totalPrice = document.getElementById("total-price");
    const totalPrice2 = document.getElementsByClassName("total-price2");
    const car_count = document.getElementById("car_count");
    const endereco2 = document.getElementById("endereco2");
    const DigiteEnd = document.getElementById("DigiteEnd");
    const bnt_finish = document.getElementById("bnt_finish");
    const btn_vote_exit = document.getElementById("btn_vote_exit");
    const back_car = document.getElementById("back_car");
    const name_vote = document.getElementById("name_vote");
    const name_burguer_vote = document.getElementById("name_burguer_vote");
    const stars = document.querySelectorAll(".star_vote");
    const product1 = document.getElementById("product1");
    const voteProduct = document.querySelectorAll(".voteProduct");
    const btn_underC = document.getElementById("btn_underC");
    const under_construction = document.getElementById("under_construction");
    const btn_vote = document.querySelectorAll(".btn_vote");
    const btn_vote2 = document.querySelectorAll(".btn_vote2");

       
   

    let list = [];
    let quantidade = 0; //quantidade de itens no carrinho rodapé
    let add = 0; // 0=adiciona 1=remove // itens do carrinho rodapé
    let ativo = 0; // 0=none, 1=block
    let productVote1 = 10;
    let productVote2 = 0;
    let productVote3 = 0;
    let productVote4 = 0;

    chamada1.addEventListener("click",function(){
        

        if(ativo == 0){
            carrinho.style.display = "block";
            ativo =1;
        } else{
            carrinho.style.display = "none";
            ativo =0;
        };

    });

    carrinho.addEventListener("click",function(event){
        if(event.target === car){
            carrinho.style.display = "none";
            ativo =0;
        };
    });

    btn_fechar.addEventListener("click",function(){
        carrinho.style.display = "none";
        ativo =0;
    });

    grid.addEventListener("click",function(event){ //a função vai procurar dentro de "grid" que é a div pai qualquer elemento que tenha o nome "button"
        let parentBnt = event.target.closest(".button"); //para localizar uma classe, necessita colocar ".", enquanto procurar uma id coloca-se "#"
        if(parentBnt){
            const name = parentBnt.getAttribute("data-name");
            const price = parseFloat(parentBnt.getAttribute("data-price")); //parseFloat converte a string em float
            const image = parentBnt.getAttribute("data-img")

            addToCard(name,price,image);

            chamada1.classList.remove("pulsar");
            void chamada1.offsetWidth;
            chamada1.classList.add("pulsar");
        };
    });

    grid2.addEventListener("click",function(event){ 
        let parentBnt = event.target.closest(".button"); 
        if(parentBnt){
            const name = parentBnt.getAttribute("data-name");
            const price = parseFloat(parentBnt.getAttribute("data-price"));
            const image = parentBnt.getAttribute("data-img")

            addToCard(name,price,image);

            chamada1.classList.remove("pulsar");
            void chamada1.offsetWidth;
            chamada1.classList.add("pulsar");
        };
        
    });

    itensCart.addEventListener("click", function(event) {
        // Verifica se o clique foi no botão de remover (diminuir quantidade)
        if(event.target.closest(".Btn_car_qtd")) {
            const parentBnt = event.target.closest(".Btn_car_qtd"); 
            const name = parentBnt.getAttribute("data-name");
            const price = parseFloat(parentBnt.getAttribute("data-price"));
            const image = parentBnt.getAttribute("data-img");
    
            // Aqui decide se vai remover ou adicionar itens
            if (event.target.textContent === "+") {
                addToCard(name, price, image); // Adiciona item
            } else if (event.target.textContent === "-") {
                removeItemCart(name); // Remove item
            };
            
            chamada1.classList.remove("pulsar");
            void chamada1.offsetWidth;
            chamada1.classList.add("pulsar");
        };
    });

    function addToCard(name,price,image){
        const existingItem = list.find(item => item.name === name);

        if(existingItem){
            existingItem.quantity +=1;
            carList();
            return;
        } else {
            list.push({
                name,
                price,
                quantity: 1,
                image
                
        });
        carList();
        };
    };

    function carList(){
        itensCart.innerHTML = ""; 
        let total = 0;
        
        list.forEach(item =>{
            const cartItensElement = document.createElement("div"); //para cada item na lista cria-se uma nova div pai com divs filhos
            cartItensElement.innerHTML = `
            <div class="car-item-add">
                <div class="burguer_car">
                    <div class="burguer">
                        <img src=${item.image}>
                    </div>
                    <div class="item_car">
                        <p>${item.name}</p>
                    </div>
                </div>
                <div>
                    <button class="btn_delete" data-name="${item.name}"> 
                        Remover
                    </button>
                    <div class="item_car">
                        <Button class="Btn_car_qtd" data-name="${item.name}" data-price="${item.price}" data-img="${item.image}">-</Button>
                        <div class="item_car_qtd">
                            <p>${item.quantity}</p>
                        </div>
                        <Button class="Btn_car_qtd" data-name="${item.name}" data-price="${item.price}" data-img="${item.image}">+</Button>
                    </div>
                </div>
            </div>
            `
            itensCart.appendChild(cartItensElement); //adiciona a div criada dentro da div principal referenciada por itensCart

            total += item.price * item.quantity;
            
        });

        // como a variavel está buscando uma ID, somente buscando seus elementos já basta pra colocar em moeda Brasil
        totalPrice.textContent = total.toLocaleString("pt-BR",{
            style: "currency",
            currency:"BRL"
        });

       
        if(add == 0){
            quantidade += 1;
            
            Toastify({
                text: "1 item adicionado!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "rgb(19, 87, 31)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

        }else{
            quantidade -= 1;

            Toastify({
                text: "1 item excluído!",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "red",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        };
        
        car_count.textContent = quantidade; 
        /* car_count.innerHTML = list.length; */ // esta função calcula a quantidade de itens diferentes no carrinho, contando como 1 vários itens de mesmo nome

        
        
    };

    itensCart.addEventListener("click", function(event){
        if(event.target.classList.contains("btn_close")){
            const name = event.target.getAttribute("data-name");
            removeItemCart(name);
            
            chamada1.classList.remove("pulsar");
            void chamada1.offsetWidth;
            chamada1.classList.add("pulsar");
        }
    });

    function removeItemCart(name){
        const index = list.findIndex(item => item.name === name);
        
        if(index !== -1){  //!== sinal de diferente,já que se o findIndex não encontrar o elemento vai devolver -1
            const item = list[index];

            if(item.quantity > 1){
                item.quantity -=1;

            } else{
                list.splice(index, 1);

            }

            add = 1;
            carList();
            add = 0;
        } 
    };

    itensCart.addEventListener("click", function(event){
        if(event.target.classList.contains("btn_delete")){
            const name = event.target.getAttribute("data-name");
            deleteItemCart(name);
            
            chamada1.classList.remove("pulsar");
            void chamada1.offsetWidth;
            chamada1.classList.add("pulsar");
        }
    });

    function deleteItemCart(name){
        const index = list.findIndex(item => item.name === name);
        
        if(index !== -1){  
            const item = list[index];
            
            quantidade -= item.quantity+1;
            list.splice(index, 1);

            carList();
            
        } 
    };

    endereco2.addEventListener("input", function(event){
        let endereco2Valor = event.target.value;

        if(endereco2Valor !== ""){
            DigiteEnd.style.display = "none";
            endereco2.style.border = "2px solid grey";
        }
    });

    bnt_finish.addEventListener("click", function(){
        if(list.length === 0){ // se a quantidade da lista for igual a zero, nada acontece
            return;
        }

        if(endereco2.value === ""){
            DigiteEnd.style.display = "flex";
            endereco2.style.border = "2px solid red";
            return;
        }

        let constList = list.map((item) =>{
            return(
                `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} \n`
            )
    
        }).join("")
        
        let message = encodeURIComponent(constList);
        let phone = "14988070943"

        window.open(`http://wa.me/${phone}?text=${message} Endereço: ${endereco2.value}`, "_blank")
        list = [];
        endereco2.value = "";
        carList();
    });

    function checkRestaurantOpen(){
        const data = new Date();
        const hora = data.getHours();

        return hora >= 18 && hora < 23;
    };

    const hor = document.getElementById("hor");
    const isOpen = checkRestaurantOpen();
    
    if(isOpen){
        hor.style.backgroundColor = "rgb(19, 87, 31)";
    }else{
        hor.style.backgroundColor = "red";
    };

    //Sistema de votos e estrelas

    stars.forEach((star,index) =>{

        let nota = 0;

        star.addEventListener('mouseover',function(){
            
            for(let i=0; i<=index;i++){
                stars[i].classList.add("filled");
            }
        });

        star.addEventListener('mouseout',()=>{

            for(let i=0;i<=index;i++){
                stars[i].classList.remove("filled");
                
            }
        });
        
        
        star.addEventListener('click',()=>{
            
            stars.forEach((s)=>{
                s.classList.remove("selected");
            }); 
               
            for(let i=0;i<=index;i++){
                    stars[i].classList.add("selected");
                    nota = index+1;
                    console.log(nota);
                    
            }
        });

    });
    
    // esconder janela de sistemas de votos
    btn_vote_exit.addEventListener('click',()=>{
        back_car.style.display = "none";
    });

    btn_vote.forEach(button =>{
        button.addEventListener('click',()=>{
            const productName = button.getAttribute("data-name");
            const productImg = button.getAttribute("data-img");
            
            name_vote.textContent = productName;
            name_burguer_vote.innerHTML = `<img src="${productImg}" alt="${productName}">`;
            
            back_car.style.display = "block";
            
        })
    });


    btn_underC.addEventListener('click',()=>{
        under_construction.style.animation = "slideDown 0.5s forwards";
        console.log("funcionou");
    })
    
});
