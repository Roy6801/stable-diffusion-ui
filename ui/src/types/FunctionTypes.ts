interface AddModelProps {
  tag: string;
  revision: string;
}

interface RemoveModelProps {
  tag: string;
}

interface FeedProps {
  className?: string;
  state?: string[];
}

interface PromptProps {
  className?: string;
  setState?: (val: string[] | ((prevState: string[]) => string[])) => void;
}

interface Text2ImageProps {
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  num_inference_steps: number;
  aspect_ratio: string;
  seed: number;
  batch_size: number;
}

export type {
  AddModelProps,
  RemoveModelProps,
  FeedProps,
  PromptProps,
  Text2ImageProps,
};
