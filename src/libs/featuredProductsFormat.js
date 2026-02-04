export function formatFeaturedProducts(product) {

    const brand = product.brand.charAt(0).toUpperCase()+
                    product.brand.slice(1).toLowerCase();

    const rawTitle = product.title || "";

    console.log("shortdesc",product.shortDescription);
    const screenMatch = rawTitle.match(/(\d{2}\.\d)\s*inch/i);
    const screenSize = screenMatch? `${screenMatch[1]}"`:"";

    const shortTitle = `${brand} ${product.series || ""} ${screenSize}`.trim();

    return {

        id:product._id.toString(),
        brand,
        title:shortTitle || rawTitle,
        price:product.price,
        image:product.image || "/products/default.png",
        description: product.shortDescription  || "",
    };

}