import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
 
function printPDF () {
    const domElement = document.getElementById('your-id')
    html2canvas(domElement, { onclone: (document) => {
      document.getElementById('print-btn').style.visibility = 'hidden'
    }})
    .then((canvas) => {
        const img = canvas.toDataURL('image/png')
        const pdf = new jsPdf()
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
        pdf.save('your-filename.pdf')
})