import React,{useRef,useState,useEffect} from "react";
import "./style.css";
import { PDFExport } from '@progress/kendo-react-pdf'
import jsPDF from 'jspdf'
import numberToWords from 'number-to-words';


function PrintInvoice(props) {
  const {invoice,modalContentRef,user } = props;
  const products = invoice.items;
  
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.price;
  });
  let taxAmount = total * 0.18
  const [number,setNumber] = useState(123456); // You can change this predefined number
  const [words, setWords] = useState('');
  let oTotal = total + taxAmount;

  useEffect(() => {
    const result = numberToWordsConverter(number);
    setWords(result);
  }, [number]);

  const numberToWordsConverter = (num) => {
    return numberToWords.toWords(num).toUpperCase()+" ONLY";
  };
  
  const pdfref = useRef(null)
  const downloadPdf=()=>{

    pdfref.current.save();
  }
  return (
    <>  
    <div ref={modalContentRef} style={{overflowX:"scroll"}}>
      <div className="container border border-1 printInvoiceContainer">
        <div id="Invoice">
        <PDFExport ref={pdfref} fileName="invoice" paperSize="A2">
          <div style={{ width: "100%", height: "100%",padding:"20px",fontSize:"20px" }}>
            <div className="header">
              <div className="companyName" id="companyName">
                {invoice.sellerName}
             </div>
              <div className="phoneNum" id="phoneNum">
                Phone Number: {invoice.sellerMobile}
              </div>
              <div className="email" id="email">
                Email: {invoice.sellerEmail}
              </div>
              {/* <img
                style={{
                  position: "relative",
                  top: "0",
                  left: "900px",
                  width: "100px",
                  height: "100px",
                }}
                src = {myImage}
                alt="Icon"
              /> */}
            </div>
            <br />
            <h1>Tax Invoice</h1>
            <div className="floatText1">
              <span className="billTo" id="billTo">
                Bill to: {invoice.customerName}
                <p>{invoice.customerAddress}</p>
              </span>
              <span className="invoiceNo" id="invoiceNo">
                Invoice Number: {invoice.invoiceNo}
              </span>
            </div>
            <br />
            <div className="floatText2">
              <span className="companyAddress" id="customer-email">
                {/* Customer Email: {customerEmail} */}
              </span>
              <br />
              <span className="customer-phone" id="customer-phone">
                Phone Number: {invoice.customerMobile}
              </span>
              
              <span className="date" id="date">
                Date: {invoice.invoiceDate.slice(0,10)}
              </span>
            </div>

            <table id="itemTable">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "35%", textAlign: "start" }}>
                    Item Name
                  </th>
                  <th style={{ width: "10%" }}>HSN/SAC</th>
                  <th className="rightAlign" style={{ width: "15%" }}>
                    Quantity
                  </th>
                  <th className="rightAlign" style={{ width: "15%" }}>
                    Price/Unit
                  </th>
                  <th className="rightAlign" style={{ width: "15%" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "start" }}>{product.name}</td>
                    <td></td>
                    <td className="rightAlign">{product.quantity}</td>
                    <td className="rightAlign">$ {product.price}</td>
                    <td className="rightAlign">
                    $ {product.quantity * product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td style={{ textAlign: "start", fontWeight: "bold" }}>
                    Total
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span id="totalAmount">$ {total}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="table-wrapper">
              <div className="custom-table-container">
                <table className="custom-first-table ms-4">
                  <tr>
                    <td className="upperCase1">INVOICE AMOUNT IN WORDS</td>
                  </tr>
                  <tr className="custom-first-alternate-row">
                    <td>
                      <p id="result">{numberToWordsConverter(oTotal)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="upperCase1">TERMS AND CONDITIONS</td>
                  </tr>
                  <tr className="custom-first-alternate-row">
                    <td>Thank you for doing business with us.</td>
                  </tr>
                </table>

                <table className="custom-second-table me-4">
                  <tr>
                    <td>Sub Total</td>
                    <td
                      className="rightAlign"
                      id="subTotal"
                      style={{ textAlign: "end" }}
                    >
                      $ {total}
                    </td>
                  </tr>
                  <tr>
                    <td>Tax </td>
                    <td
                      className="rightAlign"
                      id="tax"
                      style={{ textAlign: "end" }}
                    >
                      $ {taxAmount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="custom-second-highlighted-row">
                    <td>Total</td>
                    <td
                      className="rightAlign"
                      id="oTotal"
                      style={{ textAlign: "end" }}
                    >
                      $ {oTotal}
                    </td>
                  </tr>
                  <tr>
                    <td>Received</td>
                    <td className="rightAlign" style={{ textAlign: "end" }}>
                      $ 0
                    </td>
                  </tr>
                  <tr className="custom-second-bottom-outline-row">
                    <td>Balance</td>
                    <td
                      className="rightAlign"
                      id="bal"
                      style={{ textAlign: "end" }}
                    >
                      $ 0
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <p className="signatureSpace1" id="signatureSpace1">
              {" "}
              For {user.name}
            </p>
            <p className="signatureSpace2"> Authorized Signatory</p>
          </div>
          </PDFExport>
        </div>
      </div>
    </div>
    <button className="btn btn-primary" onClick={downloadPdf}>Download</button>
    </>
  );
}

export default PrintInvoice;
