const products = [
  { id: 1, img: "Подарок 1.jpg", price: 100, title: "Подарочный набор 1" },
  { id: 2, img: "Подарок 2.jpg", price: 200, title: "Подарочный набор 2" },
  { id: 3, img: "Подарок 3.jpg", price: 400, title: "Подарочный набор 3" },
  { id: 4, img: "Подарок 4.jpg", price: 500, title: "Подарочный набор 4" },
  { id: 5, img: "Подарок 5.jpg", price: 1000, title: "Подарочный набор 5" },
  { id: 6, img: "Подарок 6.jpg", price: 600, title: "Подарочный набор 6" },
];

export const productList = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(products);
  }, 3000);
});
