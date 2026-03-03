 "use  client";
 
 export default function HeaderSection() {

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
            className={`ui-tab ${index === 0 ? "ui-tab-active" : ""}`}>

                {tab}

            </button>
        ))}
       
      </div>
    </section>
  );
}
