import { useState } from "react";

const useAsync = () => {
  const [loading, setLoading] = useState(false);

  const run = async (asyncFunc) => {
    try {
      setLoading(true);
      const result = await asyncFunc();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, run };
};

export default useAsync;
