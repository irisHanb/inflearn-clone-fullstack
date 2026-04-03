"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  }

  return (
    <div className="flex flex-col gap-7 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-gray-700">인프론 계정으로 로그인 할 수 있어요</p>
      <form
        className="flex flex-col gap-5 min-w-[300px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            className="border border-gray-300 rounded-sm px-4 py-2"
            type="email"
            placeholder="example@inflear.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호</label>
          <input
            className="border border-gray-300 rounded-sm px-4 py-2"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="bg-green-500 text-white font-bold rounded-sm px-3 py-2 flex items-center justify-center cursor-pointer">
            로그인
          </button>
          <Link
            href={"/sign-up"}
            className="rounded-sm px-3 py-2 flex items-center justify-center cursor-pointer"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
