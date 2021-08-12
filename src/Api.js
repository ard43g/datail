const baseApi = "https://datainlife.ru/junior_task/";
const get = "get_products.php";
const post = "add_basket.php";

export const getItems = async () => {
    try {
        const response = await fetch(`${baseApi}${get}`).then((res) => res.json());
        return response;
    } catch (e) {
        throw new Error(alert(e));
    }
};

export const postOrder = async (data) => {
    const response = await fetch(`${baseApi}${post}`, {
        method: "POST",
        body: data,
    });

    return await response.json();
};
