interface AddressComponent {
  ong_name: string;
  short_name: string;
  types: string[];
}
export interface GetGeocodeResponse {
  results: [
    {
      address_components: AddressComponent[];
      formatted_address: string;
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
        location_type: string;
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
      };
      place_id: string;
      plus_code: {
        compound_code: string;
        global_code: string;
      };
      types: string[];
    }
  ];
  status: string;
}
