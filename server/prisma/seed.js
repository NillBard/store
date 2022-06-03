const { db } = require("../db");

module.exports = {
  async seed() {
    await db.deviceList.deleteMany();

    await db.deviceList.createMany({
      data: [
        {
          img: "https://app-room76.ru/wp-content/uploads/2021/05/30056770b.jpg",
          description: "Greate phone",
          price: 80000,
          name: "Iphone 12",
        },
        {
          img: "https://samsungstore.ru/upload/files/product/SM-G991BZVGSER.jpg",
          description: "Greate phone",
          price: 75000,
          name: "Samsung s21",
        },
        {
          img: "https://img01.huaweifile.com/ru/russia/hwhn/pms/uomcdn/RU/pms/202201/gbom/6941487249954/800_800_1E89FCB5648A7EA3A5BEC573E32D2601mp.webp",
          description: "Greate phone",
          price: 80000,
          name: "Huawei P50",
        },
        {
          img: "https://ноу-хау.рф/resources/01/500/400/0e/9d/2bce8f76-203d-4664-91aa-89d54cd37a35.jpg",
          description: "Greate phone",
          price: 30000,
          name: "Realme 8 Pro",
        },
      ],
    });
  },
};
