export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {

      year: "numeric",
      month: "short",
      day: "numeric",
  
    });
  };