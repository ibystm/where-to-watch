import { baseRepository } from "./axios";
import { endPoints } from "./constants";
import { FetchConfigurationResponse } from "./types/configurations";
export const fetchConfigurations =
  async (): Promise<FetchConfigurationResponse> => {
    const res = await baseRepository.get<FetchConfigurationResponse>(
      `${endPoints.configuration}`
    );
    return res.data;
  };
