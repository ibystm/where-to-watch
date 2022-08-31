import { baseRepository } from "../axios";
import { movieUrls } from "../endPoints";
import { FetchConfigurationResponse } from "../types/configurations";

export const fetchConfigurations =
  async (): Promise<FetchConfigurationResponse> => {
    const res = await baseRepository.get<FetchConfigurationResponse>(
      `${movieUrls.configuration}`
    );
    return res.data;
  };
