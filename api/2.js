// // const main = async () => {
// //   const response = await fetch("https://jsonplaceholder.typicode.com/users");

// //   const result = await response.json();

// //   for (let i = 0; i < result.length; i++) {
// //     console.log(i + 1 + "." + result[i].name + "-" + result[i].email);
// //   }
// // };
// // main();

// const userIds = [1, 3, 5];
// userIds.forEach(async (userId) => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/usersId=${userId}`);
//   const result = await response.json();
//   result.forEach((post) => {
//     console.log(userIds, post.title, post.body);
//   });
// });

// feebZCAgzRji0NVaQ8_OpP9VbwpyNlwFGrjmBqkfmjU

const images = document.getElementById("images");

const main = async () => {
  constresponse = await fetch("https://api.unsplash.com/photos?page=1", {
    headers: {
      Authorization: "Client-ID feebZCAgzRji0NVaQ8_OpP9VbwpyNlwFGrjmBqkfmjU ",
    },
  });
  const result = -(await response.json());
  result.forEach((photo) => {
    const id = photo.id;
    const imageUrl = photo.urls.full;

    images.innerHTML += `
    <img src="${imageUrl}" alt="${id}"/>
    `;
  });
};

main(currentPage);
button.addEventListener("click", () => {
  currentPage++;
  main(currentPage);
});
