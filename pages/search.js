import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import noresult from "../assets/images/noresult.svg";
import Property from "../components/Property.jsx";
import { fetchApi, baseUrl } from "../utils/fetchApi";
const search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  
  return (
    <Box>
      <Flex
        bg='gray.300'
        cursor='pointer'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontSize='lg'
        fontWeight='black'
        justifyContent='center'
        alignItems='center'
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <Text>search property by filters</Text>
        <Icon as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='3xl'>Propeties {router.query.purpose}</Text>
      <Flex flexWrap='wrap'>
        {properties?.map((property) => 
          <Property property={property} key={property.id} />
        )}
      </Flex>
      {properties?.length === 0 && (
        <Flex
          alignItems='center'
          justifyContent='center'
          marginTop='5'
          marginBottom='5'
          flexDirection='column'
        >
          <Image src={noresult} />
          <Text fontSize='2xl' marginTop='3'>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default search;
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const sort = query.sort || "price-desc";
  // const lang = query.lang || "en";
  const rentFrequency = query.rentFrequency || "yearly";
  const categoryExternalID = query.categoryExternalID || "4";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const priceMin = query.priceMin || "0";
  const priceMax = query.priceMax || "1000000";
  const areaMax = query.areaMax || "35000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  // const furnishingStatus = query.furnishingStatus || "furnished";
  // const hasPanorama = query.hasPanorama || "true";
  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${priceMin}&priceMax=${priceMax}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
