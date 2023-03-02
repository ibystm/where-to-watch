import { baseRepository } from "../axios";
import { commons } from "../endPoints";
import { FetchConfigurationResponse } from "../types/configurations";

export const fetchConfigurations =
  async (): Promise<FetchConfigurationResponse> => {
    const res = await baseRepository.get<FetchConfigurationResponse>(
      `${commons.configuration}`
    );
    return res.data;
  };
