import { baseRepository } from "./axios";
import { requests } from "./constants";
import { FetchConfigurationResponse } from "./types/configurations";
export const fetchConfigurations =
  async (): Promise<FetchConfigurationResponse> => {
    const res = await baseRepository.get<FetchConfigurationResponse>(
      `${requests.configuration}`
    );
    return res.data;
  };
