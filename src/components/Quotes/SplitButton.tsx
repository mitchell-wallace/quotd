import { Button, Group, Loader } from '@mantine/core';
import { IconMinus, IconPlus, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface SplitButtonProps {
    buttonText: string;
    prevAction: () => void;
    nextAction: () => void;
    // iconStyle = either "arrows" or "plusminus"
    iconStyle: "arrows" | "plusminus";
    loading?: boolean;
  }

export function SplitButton({ buttonText, prevAction, nextAction, iconStyle, loading = false }: SplitButtonProps) {
    return (
        <>
            <Group gap={0}>
                <Button
                    variant="light"
                    onClick={prevAction}
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    disabled={loading}
                >
                {iconStyle === "arrows" && <IconChevronLeft size={18} />}
                {iconStyle === "plusminus" && <IconMinus size={18} />}
                </Button>
                <Button
                    variant="light"
                    style={{
                        borderRadius: 0, 
                        borderLeft: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))', 
                        borderRight: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
                    }}
                    w={120}
                >
                {loading ? <Loader size="xs" /> : buttonText}
                </Button>
                <Button
                    variant="light"
                    onClick={nextAction}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    disabled={loading}
                >
                {iconStyle === "arrows" && <IconChevronRight size={18} />}
                {iconStyle === "plusminus" && <IconPlus size={18} />}
                </Button>
            </Group>
        </>
    );
}