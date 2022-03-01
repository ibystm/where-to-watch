import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchConfigurations } from "../../../apis/fetchConfigurations";
import { AppDispatch } from "../../../store/store";
import { actions } from "../../configurations/slice/configurations";

export const useFetchConfigs = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const storeConfigs = async () => {
      const storedUrl = sessionStorage.getItem("secureBaseUrl");
      if (storedUrl === null) {
        await fetchConfigurations()
          .then((res) => {
            if (res.images) {
              sessionStorage.setItem(
                "secureBaseUrl",
                res.images.secure_base_url
              );
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    };
    const fetchConfigs = () => {
      dispatch(actions.fetchConfigurations());
    };
    storeConfigs();
    fetchConfigs();
  }, [dispatch]);
};
