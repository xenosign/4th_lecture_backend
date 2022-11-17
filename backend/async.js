const promise = new Promise((resolve, reject) => {
  function buySync(item, price, quantity) {
    console.log(`${item} 상품을 ${quantity} 개 골라서 점원에게 주었습니다.`);
    setTimeout(() => {
      console.log('계산이 필요합니다.');
      const total = price * quantity;
      return resolve(total);
    }, 1000);
  }
  buySync('포켓몬빵', 1000, 5);
});

function pay(total) {
  console.log(`${total} 원을 지불하였습니다.`);
}

async function asyncFunc() {
  const total = await promise;
  pay(total);
}

asyncFunc();
