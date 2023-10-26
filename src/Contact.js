import React from "react";

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.vivaconagua.org/wp-content/uploads/2020/11/2020_VcA-Website_Header_AllefuerWasser_kleineSchrift.jpg"
              alt=""
            />
          </div>
          <div className="col-lg-5">
          <h3 className="font-weight-light">ÜBERBLICK</h3>

            <p>
            Viva con Agua unterstützt Wasserprojekte mit der Vision “WASSER FÜR ALLE – ALLE FÜR WASSER!“. Wasser ist neben der Luft zum Atmen die Grundlage allen Lebens und ein zentrales Menschenrecht. Viva con Agua verfolgt die Vision, dass alle Menschen Zugang zu sauberem Trinkwasser, Hygieneeinrichtungen und sanitärer Grundversorgung bekommen. 2,2 Milliarden Menschen weltweit haben keinen gesicherten Zugang zu sauberem Trinkwasser. Davon fehlt rund 785 Millionen Menschen sogar die Basis-Versorgung mit Trinkwasser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
