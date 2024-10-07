import FormPost from "../../../components/ui/post-form";

// Definisikan fungsi refreshThreads
const refreshThreads = () => {
  // Logika untuk menyegarkan atau memperbarui thread
  console.log("Threads are refreshed");
};

export default function CreatePost() {
  return (
    <>
      <FormPost
        placeholder="What is happening?!"
        buttonTitle="Post"
        refreshThreads={refreshThreads} // Pastikan ini adalah fungsi
      />
    </>
  );
}

// import FormPost from "../../../components/ui/post-form";

// export default function CreatePost() {
//   return (
//     <>
//       <FormPost
//         placeholder="What is happening?!"
//         buttonTitle="Post"
//         refreshThreads={refreshThreads}
//       />
//     </>
//   );
// }
