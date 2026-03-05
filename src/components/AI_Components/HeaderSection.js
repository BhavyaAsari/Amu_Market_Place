 "use  client";
 
 export default function HeaderSection({selectedPurpose,setSelectedPurpose}) {

    const tabs = ["Programming","Gaming","Student","Office","Editing"];
  return (
    <section className="ui-header">
      <div>
        <h1 className="title-headerSec">AI-Powered Laptop Comparision</h1>
      </div>
      <div className="ui-tab-group">
        {tabs.map((tab,index) => (

            <button
            key={tab}
            onClick={() => setSelectedPurpose(tab)}
            className={`ui-tab ${selectedPurpose === tab ? "ui-tab-active" : ""}`}>

                {tab.charAt(0).toUpperCase() + tab.slice(1)}

            </button>
        ))}
       
      </div>
    </section>
  );
}
