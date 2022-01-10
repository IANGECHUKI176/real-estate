import { Box, Flex, Avatar, Text, Spacer } from "@chakra-ui/react";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi.js";
import ImageScrollbar from "../../components/ImageScrollbar.jsx";
// {

// }
const PropertyDetails = ({
  propertyDetails: {
    purpose,
    price,
    rentFrequency,
    rooms,
    title,
    agency,
    area,
    isVerified,
    baths,
    furnishingStatus,
    amenities,
    description,
    type,
    photos,
  },
}) => {
  return (
    <Box p='4' margin='auto' maxWidth='1000px'>
      {photos && <ImageScrollbar data={photos} />}
      <Box>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box paddingRight='3' color='green.400'>
              {isVerified && <GoVerified />}
            </Box>
            <Text fontSize='lg' fontWeight='bold'>
              AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems='center'
          p='1'
          justifyContent='space-between'
          w='250px'
          color='blue.400'
        >
          {rooms} <FaBed /> | {baths} <FaBath />| {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Box>
          <Text fontSize='lg' marginTop='2' fontWeight='bold'>
            {title}
          </Text>
          <Text lineHeight='6' color='gray.600'>
            {description}
          </Text>
        </Box>
        <Flex
          flexWrap='wrap'
          textTransform='uppercase'
          justifyContent='space-between'
        >
          <Flex
            justifyContent='space-between'
            w='400px'
            borderBottom='1px'
            borderColor='gray.300'
            padding='3'
          >
            <Text>Type</Text>
            <Text fontWeight='bold'>{type}</Text>
          </Flex>
          <Flex
            justifyContent='space-between'
            w='400px'
            borderBottom='1px'
            borderColor='gray.300'
            padding='3'
          >
            <Text>Purpose</Text>
            <Text fontWeight='bold'>{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent='space-between'
              w='400px'
              borderBottom='1px'
              borderColor='gray.300'
              padding='3'
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight='bold'>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <Text fontSize='2xl' fontWeight='bold' marginTop='5'>Amenities</Text>
          )}
          <Flex>
            {amenities.map((item) =>
              item.amenities.map((amenity) => (
                <Text
                  key={amenity.text}
                  color='blue.400'
                  p='2'
                  bg='gray.300'
                  fontWeight='bold'
                  m='1'
                  fontSize="14"
                >
                  {amenity.text}
                </Text>
              ))
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default PropertyDetails;
export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}
