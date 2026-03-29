// ดึง element จาก DOM
const button = document.getElementById("loadBtn");
const loadingText = document.getElementById("loading");
const dataList = document.getElementById("dataList");
const errorText = document.getElementById("error");

// ฟังก์ชัน async สำหรับดึงข้อมูล
async function fetchData() {
  // แสดง loading
  loadingText.textContent = "กำลังโหลดข้อมูล...";
  errorText.textContent = "";
  dataList.innerHTML = "";

  try {
    // เรียก API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    // เช็คว่า request สำเร็จไหม
    if (!response.ok) {
      throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }

    // แปลงข้อมูลเป็น JSON
    const data = await response.json();

    // แสดงข้อมูล (เอาแค่ 5 รายการแรก)
    data.slice(0, 5).forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      dataList.appendChild(li);
    });

    // ลบ loading
    loadingText.textContent = "";
  } catch (error) {
    // ถ้า error จะแสดงข้อความ
    loadingText.textContent = "";
    errorText.textContent = error.message;
    errorText.style.color = "red";
  }
}

// กดปุ่มแล้วเรียกฟังก์ชัน
button.addEventListener("click", fetchData);
