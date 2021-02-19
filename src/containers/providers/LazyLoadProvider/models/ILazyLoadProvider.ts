interface ILazyLoadProvider {
  encode(image: string): Promise<string>
}

export default ILazyLoadProvider
