import { useState } from "react";
import PoemTranslator from "./PoemTranslator";
import InvoiceProcessor from "./InvoiceProcessor";
import "./styles.css";

function App() {
  const [activeTab, setActiveTab] = useState("poem");

  return (
    <div className="app">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("poem")}
          className={activeTab === "poem" ? "active" : ""}
        >
          Poem Translator
        </button>
        <button
          onClick={() => setActiveTab("invoice")}
          className={activeTab === "invoice" ? "active" : ""}
        >
          Invoice Processor
        </button>
      </div>

      {activeTab === "poem" && <PoemTranslator />}
      {activeTab === "invoice" && <InvoiceProcessor />}
    </div>
  );
}

export default App;
