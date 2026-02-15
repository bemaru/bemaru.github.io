---
title: "C++][clang-tidy] clang-tidy modernize-pass-by-value 문서 번역 및 해설"
date: 2022-12-13
tags: []
summary: ""
originalUrl: "https://bmaru.tistory.com/171"
---

*이 글은 [Tistory 원본](https://bmaru.tistory.com/171)에서 마이그레이션되었습니다.*

# modernize-pass-by-value

> With move semantics added to the language and the standard library updated with move constructors added for many types it is now interesting to take an argument directly by value, instead of by const-reference, and then copy. This check allows the compiler to take care of choosing the best way to construct the copy.

언어에 이동 의미론(move semantics)이 추가되고  
많은 타입에 대한 이동 생성자(move constructors)가 추가된 표준 라이브러리가 업데이트되면서  
이제는 const-reference 대신, 직접 값으로 인자를 받고 복사하는 것이 흥미롭다.  
이 검사를 통해 컴파일러는 복사본을 생성하는 가장 좋은 방법을 선택할 수 있습니다.

> The transformation is usually beneficial when the calling code passes an rvalue and assumes the move construction is a cheap operation. This short example illustrates how the construction of the value happens:

이 변환은 보통, 호출 코드가  
rvalue을 전달(passes an rvalue)하고 이동 생성(move construction)이 저렴한 작업이라고 추정할 때 유용합니다.  
이 짧은 예는 값의 생성이 어떻게 이루어지는지 보여줍니다.  
=> 해설 : 매개변수 s가 pass by value 지만, lvalue와 rvalue에 따라 copy, move 를 선택한다

```
void foo(std::string s);
std::string get_str();

void f(const std::string &str) {
  foo(str);       // lvalue  -> copy construction
  foo(get_str()); // prvalue -> move construction
}
```

> Note  
> Currently, only constructors are transformed to make use of pass-by-value. Contributions that handle other situations are welcome!

주의  
현재 생성자만 pass-by-value를 사용하도록 변환됩니다. 다른 상황을 처리하는 기여도 환영합니다!

## Pass-by-value in constructors

> Replaces the uses of const-references constructor parameters that are copied into class fields. The parameter is then moved with std::move().  
> Since std::move() is a library function declared in <utility> it may be necessary to add this include. The check will add the include directive when necessary.

클래스 필드로 복사되는 const-reference 생성자 매개변수의 사용을 교체합니다.  
이 매개변수는 std::move를 통해 이동됩니다.  
std::move()는 <utility>에 선언된 라이브러리 함수이므로 이 include문의 추가가 필요할 수도 있습니다.   
이 검사는 필요한 경우 포함문을 추가합니다.

```
 #include <string>

 class Foo {
 public:
-  Foo(const std::string &Copied, const std::string &ReadOnly)
-    : Copied(Copied), ReadOnly(ReadOnly)
+  Foo(std::string Copied, const std::string &ReadOnly)
+    : Copied(std::move(Copied)), ReadOnly(ReadOnly)
   {}

 private:
   std::string Copied;
   const std::string &ReadOnly;
 };

 std::string get_cwd();

 void f(const std::string &Path) {
   // The parameter corresponding to 'get_cwd()' is move-constructed. By
   // using pass-by-value in the Foo constructor we managed to avoid a
   // copy-construction.
   Foo foo(get_cwd(), Path);
 }
```

> If the parameter is used more than once no transformation is performed since moved objects have an undefined state. It means the following code will be left untouched:

매개변수를 한번 이상 사용하지 않으면 변환이 수행되지 않는다,  
왜냐하면 이동된 객체의 상태가 정의되지 않았기 때문이다.   
다음 코드가 변경되지 않는 상태로 유지됨을 의미한다.

```
#include <string>

void pass(const std::string &S);

struct Foo {
  Foo(const std::string &S) : Str(S) {
    pass(S);
  }

  std::string Str;
};
```

## Known limitations

> A situation where the generated code can be wrong is when the object referenced is modified before the assignment in the init-list through a “hidden” reference.

생성된 코드가 틀릴 수 있는 상황은  
init-list로 초기화 되기 전에 숨겨진 참조에 의해 참조된 객체가 변경되는 경우이다.

Example:

```
 std::string s("foo");

 struct Base {
   Base() {
     s = "bar";
   }
 };

 struct Derived : Base {
-  Derived(const std::string &S) : Field(S)
+  Derived(std::string S) : Field(std::move(S))
   { }

   std::string Field;
 };

 void f() {
-  Derived d(s); // d.Field holds "bar"
+  Derived d(s); // d.Field holds "foo"
 }
```

## Not about delayed template parsing

When delayed template parsing is enabled, constructors part of templated contexts; templated constructors, constructors in class templates, constructors of inner classes of template classes, etc., are not transformed. Delayed template parsing is enabled by default on Windows as a Microsoft extension: [Clang Compiler User’s Manual - Microsoft extensions](https://clang.llvm.org/docs/UsersManual.html#microsoft-extensions).

Delayed template parsing can be enabled using the -fdelayed-template-parsing flag and disabled using -fno-delayed-template-parsing.

Example:

```
  template <typename T> class C {
    std::string S;

  public:
=  // using -fdelayed-template-parsing (default on Windows)
=  C(const std::string &S) : S(S) {}

+  // using -fno-delayed-template-parsing (default on non-Windows systems)
+  C(std::string S) : S(std::move(S)) {}
  };
```

See also

For more information about the pass-by-value idiom, read: [Want Speed? Pass by Value](https://web.archive.org/web/20140205194657/http://cpp-next.com/archive/2009/08/want-speed-pass-by-value/).

## Options

IncludeStyle[¶](https://clang.llvm.org/extra/clang-tidy/checks/modernize/pass-by-value.html#cmdoption-arg-includestyle)

A string specifying which include-style is used, llvm or google. Default is llvm.

ValuesOnly

When true, the check only warns about copied parameters that are already passed by value. Default is false.

---

출처

* <https://clang.llvm.org/extra/clang-tidy/checks/modernize/pass-by-value.html>

함께 보면 좋은 글

* <https://stackoverflow.com/questions/51705967/advantages-of-pass-by-value-and-stdmove-over-pass-by-reference>
* <https://en.cppreference.com/w/cpp/language/copy_elision>