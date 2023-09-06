import { IOperation } from "../models/operation";
import { MyClock } from "./clock";
import { removeObjectProperties } from "./object-properties-remover";

export function printHTML(htmlContent: string) {
  // Create a new hidden iframe to load the HTML content
  const printIframe = document.createElement('iframe');
  printIframe.style.display = 'none';

  // Append the iframe to the document body
  document.body.appendChild(printIframe);

  // Set the iframe content
  printIframe.contentDocument!.open();
  printIframe.contentDocument!.write('<html><head><title>Print</title></head><body>');
  printIframe.contentDocument!.write(htmlContent);
  printIframe.contentDocument!.write('</body></html>');
  printIframe.contentDocument!.close();

  // Print the content of the iframe
  printIframe.contentWindow!.print();

  // Remove the iframe after printing
  document.body.removeChild(printIframe);
}

export function printReciept(operation: IOperation) {

  if (!operation.person) return {};
  if (!operation.inventory) return {};
  if (!operation.inventory.product) return {};
  if (!operation.inventory.branch) return {};
  const prod = removeObjectProperties(operation.inventory.product, ["_id"]);
  const branch = removeObjectProperties(operation.inventory.branch, ["_id"]);
  const inv = removeObjectProperties(operation.inventory, [
    "_id",
    "product",
    "branch",
  ]);
  const per = removeObjectProperties(operation.person, ["_id"]);
  const op = removeObjectProperties(operation, [
    "inventory",
    "employee",
    "person",
  ]);
  const printable = {
    ...prod,
    branch,
    person: per.name,
    ...per,
    ...inv,
    ...op,
  };

  const createdAtDate = MyClock.fromDateString(printable.createdAt ?? Date.now().toString())
  const localizedDate = MyClock.toLocal(createdAtDate)

  console.log("printable localizedDate", printable)
  const printableHTML = `<div style="display:flex; flex-direction:column;">
  <section style="margin: 0.3rem; display:flex; flex-direction:column; flex-wrap:wrap; width: 100%; justify-content: center; align-items:center" >
    <h2 style="margin:0" >${printable.branch?.business?.name ?? ""}</h2>
      <p style="margin:0" >${printable.branch?.name ?? ""}</p>
      <p style="margin:0" >${printable.branch?.contact ?? ""}</p>
      <p style="margin:0" >${printable.branch?.email ?? ""}</p>
      <p style="margin:0" >${printable.branch?.location ?? ""}</p>
      <p style="margin:0" >${localizedDate.toLocaleString()}</p>
  </section>
  <section style="margin: 0.3rem">
    <h3 style="margin:0" >${printable.person ?? ""}</h3>
    <p style="margin:0" >${printable.contact ?? ""}}</p>
    <p style="margin:0" >${printable.nationalId ?? ""}}</p>
  </section>
  <section style="margin: 0.3rem; display:flex; flex-direction:row; flex-wrap:wrap; width: 100%; justify-content: space-between; align-itmes:center" >
    <h4 style="margin:0" >${printable.serialNumber ?? ""}</h4>
    <h4 style="margin:0" >${printable.unitSellPrice ?? ""} x ${printable.quantity ?? ""} = ${(printable.unitSellPrice ?? 1) * (printable.quantity ?? 1)}</h4>
  </section>
	<ul style="margin: 0.3rem">
		<p style="margin:0" >${printable.name ?? ""}</p>
		<p style="margin:0" >${printable.detail ?? ""}</p>
	</ul>
</div>`;
  printHTML(printableHTML);
}
