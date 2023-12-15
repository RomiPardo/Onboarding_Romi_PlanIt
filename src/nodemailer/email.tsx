import React from "react";
import {
  Html,
  Text,
  Body,
  Tailwind,
  Container,
} from "@react-email/components";

type EmailProps = {
  message: string;
};

export const Email = ({ message }: EmailProps) => {
  const matchLineBreak = /\u000A|\u000D|\u000D\u000A/;

  return (
    <Html>
      <Tailwind>
        <Container className="bg-blue-300 text-black">
          <Body className="p-2">
            <div className="rounded-lg border border-black bg-white px-6 py-2">
              {message.split(matchLineBreak).map((paragraph, index) => (
                <Text className="text-lg font-normal" key={index}>
                  {paragraph}
                </Text>
              ))}
            </div>
          </Body>
        </Container>
      </Tailwind>
    </Html>
  );
};
