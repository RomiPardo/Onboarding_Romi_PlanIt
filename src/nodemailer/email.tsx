import React from "react";
import {
  Html,
  Text,
  Body,
  Tailwind,
  Container,
  Img,
  Head,
  Section,
} from "@react-email/components";

type EmailProps = {
  message: string;
};

export const Email = ({ message }: EmailProps) => {
  const matchLineBreak = /\u000A|\u000D|\u000D\u000A/;

  return (
    <Html>
      <Tailwind>
        <Container className="w-full bg-[#FBFBFB] text-black">
          <Head>
            <Img
              src="https://www.planit.com.uy/assets/logo/logo_black-c95d6135932d06deef913ba23f6b5cbef09f86e72d84772ceb8cc0cb2efb5be1.png"
              alt="Planit Logo"
              width="96"
              height="33.47"
              className="pb-4 pl-5 pt-9"
            />
          </Head>

          <Body className="px-5 py-5">
            <Section className="border border-[#7D7D7D] bg-white px-6 py-2">
              {message.split(matchLineBreak).map((paragraph, index) => (
                <Text className="text-lg font-normal" key={index}>
                  {paragraph}
                </Text>
              ))}
            </Section>
          </Body>

          <Container className="pb-5">
            <Text className="text-center text-dark-gray">
              PlanIT, 2021 - All rights reserved
            </Text>
          </Container>
        </Container>
      </Tailwind>
    </Html>
  );
};
