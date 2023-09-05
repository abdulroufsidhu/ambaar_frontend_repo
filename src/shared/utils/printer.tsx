export function printHTML(htmlContent: string) {
  const printWindow = window.open("", "", "width=600,height=600");
  printWindow?.document.open();
  printWindow?.document.write("<html><head><title>Print</title></head><body>");
  printWindow?.document.write(htmlContent);
  printWindow?.document.write("</body></html>");
  printWindow?.document.close();
  printWindow?.print();
  // printWindow?.close();
}

export function printReciept(printable: any) {
	console.log("printable", printable)
  const printableHTML = `<div style="display:flex; flex-direction:column;">
  <section style="display:flex; flex-direction:column; flex-wrap:wrap; width: 100%; justify-content: center; align-items:center" >
    <h2 style="margin:0" >${printable.branch?.business?.name ?? ""}</h2>
      <p style="margin:0" >${printable.branch?.name ?? ""}</p>
      <p style="margin:0" >${printable.branch?.contact ?? ""}</p>
      <p style="margin:0" >${printable.branch?.email ?? ""}</p>
      <p style="margin:0" >${printable.branch?.location ?? ""}</p>
      <p style="margin:0" >${printable.createdAt}</p>
  </section>
  <section>
    <h3>${printable.person}</h3>
    <p>${printable.contact}}</p>
    <p>${printable.nationalId}}</p>
  </section>
  <section style="display:flex; flex-direction:row; flex-wrap:wrap; width: 100%; justify-content: space-between; align-itmes:center" >
    <h4>${printable.serialNumber}</h4>
    <h4>${printable.unitSellPrice} X ${printable.quantity} = ${
    parseInt(printable.unitSellPrice) * parseInt(printable.quantity)
  }</h4>
  </section>
	<ul>
		<p>${printable.name}</p>
		<p>${printable.detail}</p>
	</ul>
</div>`;
printHTML(printableHTML);
}
