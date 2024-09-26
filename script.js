document.addEventListener('DOMContentLoaded', function(){
    const chamada1 = document.getElementById("land3");
    const carrinho = document.getElementById("car");
    const btn_fechar = document.getElementById("btn_close");
    const grid = document.getElementById("grid");
    const grid2 = document.getElementById("grid2");
    const itensCart = document.getElementById("itens-cart");
    const totalPrice = document.getElementById("total-price");
    const car_count = document.getElementById("car_count");
    const endereco2 = document.getElementById("endereco2");
    const DigiteEnd = document.getElementById("DigiteEnd");
    const bnt_finish = document.getElementById("bnt_finish");
   

    let list = [];
    let quantidade = 0; //quantidade de itens no carrinho rodapé
    let add = 0; // 0=adiciona 1=remove // itens do carrinho rodapé
    let ativo = 0 // 0=none, 1=block
    chamada1.addEventListener("click",function(){
        

        if(ativo == 0){
            carrinho.style.display = "block";
            ativo =1;
        } else{
            carrinho.style.display = "none";
            ativo =0;
        }

    })

    carrinho.addEventListener("click",function(event){
        if(event.target === car){
            carrinho.style.display = "none";
            ativo =0;
        }
    })

    btn_fechar.addEventListener("click",function(){
        carrinho.style.display = "none";
        ativo =0;
    })

    grid.addEventListener("click",function(event){ //a função vai procurar dentro de "grid" que é a div pai qualquer elemento que tenha o nome "button"
        let parentBnt = event.target.closest(".button"); //para localizar uma classe, necessita colocar ".", enquanto procurar uma id coloca-se "#"
        if(parentBnt){
            const name = parentBnt.getAttribute("data-name");
            const price = parseFloat(parentBnt.getAttribute("data-price")); //parseFloat converte a string em float
            addToCard(name,price);
        }
    })

    grid2.addEventListener("click",function(event){ 
        let parentBnt = event.target.closest(".button"); 
        if(parentBnt){
            const name = parentBnt.getAttribute("data-name");
            const price = parseFloat(parentBnt.getAttribute("data-price"));
            addToCard(name,price);
            
        }
        
    })

    function addToCard(name, price){
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
        })
        carList();
        }
    }

    function carList(){
        itensCart.innerHTML = ""; 
        let total = 0;
        

        list.forEach(item =>{
            const cartItensElement = document.createElement("div"); //para cada item na lista cria-se uma nova div pai com divs filhos
            cartItensElement.innerHTML = `
            <div class="car-item-add">
                <div>
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                    <p>Qtd: ${item.quantity}</p>
                </div>
                <button class="btn_close" data-name="${item.name}"> 
                    Remover
                </button>
            </div>
            `
            itensCart.appendChild(cartItensElement); //adiciona a div criada dentro da div principal referenciada por itensCart

            total += item.price * item.quantity;
            
        })
        totalPrice.textContent = total.toLocaleString("pt-BR",{
            style: "currency",
            currency:"BRL"
        })

        if(add == 0){
            quantidade += 1;
        }else{
            quantidade -= 1;
        }
        
        car_count.textContent = quantidade; 
        /* car_count.innerHTML = list.length; */ // esta função calcula a quantidade de itens diferentes no carrinho, contando como 1 vários itens de mesmo nome
    }

    itensCart.addEventListener("click", function(event){
        if(event.target.classList.contains("btn_close")){
            const name = event.target.getAttribute("data-name");
            removeItemCart(name);
        }
    })

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
    }

    endereco2.addEventListener("input", function(event){
        let endereco2Valor = event.target.value;

        if(endereco2Valor !== ""){
            DigiteEnd.style.display = "none";
            endereco2.style.border = "2px solid grey";
        }
    })

    bnt_finish.addEventListener("click", function(){
        if(list.length === 0){ // se a quantidade da lista for igual a zero, nada acontece
            return;
        }

        if(endereco2.value === ""){
            DigiteEnd.style.display = "flex";
            endereco2.style.border = "2px solid red";
            return;
        }
    })
})

    
