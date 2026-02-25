import CardRecommend from "./recommendationCard";

export default function RecommendationPanel({ products }) {
  return (
    <>
      <main className="wrapper">
        <div className="titleBox">
          <h1 className="titleTag">Related products</h1>
          <p className="text-purple-500 text-lg mt-1">
            Based on similar features and price range
          </p>
        </div>

        <section className="cardContainer">
          {products.map((product) => (
            <CardRecommend key={product._id} product={product} />
          ))}{" "}
        </section>
      </main>
    </>
  );
}
